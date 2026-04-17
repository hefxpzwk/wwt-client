type SessionTokens = {
  accessToken: string;
  refreshToken: string;
};

let sessionTokens: SessionTokens | null = null;

export function getAccessToken(): string | null {
  return sessionTokens?.accessToken ?? null;
}

export function getRefreshToken(): string | null {
  return sessionTokens?.refreshToken ?? null;
}

export function setTokens(tokens: SessionTokens): void {
  sessionTokens = tokens;
}

export function clearTokens(): void {
  sessionTokens = null;
}

export function hasSession(): boolean {
  return Boolean(sessionTokens?.accessToken && sessionTokens?.refreshToken);
}
