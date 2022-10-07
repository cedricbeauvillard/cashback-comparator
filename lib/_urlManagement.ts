export function extractSellerNameFromPid(pid: string): string | undefined {
  if (!pid || pid.length < 1) {
    return undefined;
  }

  if (pid.includes('-')) {
    return pid.split('-').slice(2).join(' ');
  }

  return pid;
}
