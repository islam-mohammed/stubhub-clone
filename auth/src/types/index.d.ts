declare global {
  var getAuthCookie: () => Promise<string[]>;
}

export {};
