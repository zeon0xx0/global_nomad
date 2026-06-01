import { HttpError } from '@/constants/utils/errors';

const PROXY_API_PREFIX = '/api/proxy';

function getServerBaseUrl() {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) throw new Error('BASE_URL 환경변수가 설정되지 않았습니다.');
  return baseUrl.replace(/\/$/, '');
}

export async function fetchWrapper<T>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: unknown,
  customHeaders: Record<string, string> = {},
): Promise<T> {
  const isFormData = body instanceof FormData;
  const isServer = typeof window === 'undefined';

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    Accept: 'application/json',
    ...customHeaders,
  };

  // 서버사이드: 쿠키 직접 전달
  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    if (cookieHeader) headers['Cookie'] = cookieHeader;
  }

  const requestPath = url.startsWith('/') ? url : `/${url}`;

  const fetchUrl = isServer
    ? `${getServerBaseUrl()}${requestPath}`
    : url.startsWith('/api')
      ? url
      : `${PROXY_API_PREFIX}${requestPath}`;

  const response = await fetch(fetchUrl, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    cache: 'no-store',
  });

  if (response.status === 204) {
    return {} as T;
  }

  // 안전한 바디 파싱
  const text = await response.text();
  let result: Record<string, unknown> = {};
  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    console.error('[fetchWrapper] JSON 파싱 실패, 원본 응답:', text);
  }

  if (!response.ok) {
    console.error('[fetchWrapper error]', {
      fetchUrl,
      status: response.status,
      result,
      rawBody: text, // 실제 응답 원문 확인용
    });
    throw new HttpError((result?.message as string) || 'API 요청 실패', response.status);
  }

  return result as T;
}
