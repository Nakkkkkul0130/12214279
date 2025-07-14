const API_URL = "http://20.244.56.144/evaluation-service/logs";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuYWt1bGJoYXI3MzA4QGdtYWlsLmNvbSIsImV4cCI6MTc1MjQ3NDQ2MSwiaWF0IjoxNzUyNDczNTYxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZGVkYTgxNDItZTVjYi00MzhkLWIyMjQtYjlhYWM5ZWNjNTgyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibmFrdWwiLCJzdWIiOiI1ZWQ1MzUyMC0zZjQxLTQ2MmMtOWNkZi0wMzg4ODA0MzFhZmYifSwiZW1haWwiOiJuYWt1bGJoYXI3MzA4QGdtYWlsLmNvbSIsIm5hbWUiOiJuYWt1bCIsInJvbGxObyI6IjEyMjE0Mjc5IiwiYWNjZXNzQ29kZSI6IkNaeXBRSyIsImNsaWVudElEIjoiNWVkNTM1MjAtM2Y0MS00NjJjLTljZGYtMDM4ODgwNDMxYWZmIiwiY2xpZW50U2VjcmV0IjoiYkNlQlJzZkhnVHdOY3F4diJ9.4nNpWx5_uCXUh0LYi-LRfq2n9gFhBka-hsGmO1QdrX4"; 

export const logEvent = async ({ level, pkg, message }) => {
  const allowedLevels = ["info", "warn", "debug"];
  const allowedPackages = ["api", "component", "hook", "page", "state", "style"];
  const stack = "frontend";

  if (!allowedLevels.includes(level.toLowerCase())) {
    console.error("Invalid log level");
    return;
  }

  if (!allowedPackages.includes(pkg.toLowerCase())) {
    console.error("Invalid package name");
    return;
  }

  const trimmedMessage = message.slice(0, 48); 

  const payload = {
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message: trimmedMessage,
    stack,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Logging failed", error);
    }
  } catch (err) {
    console.error("Log error:", err.message);
  }
};
