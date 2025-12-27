const BASE_URL = "http://localhost:5050/api";

export const getAssignments = async () => {
  const res = await fetch(`${BASE_URL}/assignments`);
  return await res.json();
};

export const getAssignmentById = async (id) => {
  const res = await fetch(`${BASE_URL}/assignments/${id}`);
  return await res.json();
};

export const executeQuery = async (payload) => {
  const res = await fetch(`${BASE_URL}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const getHint = async (payload) => {
  const res = await fetch(`${BASE_URL}/hint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
};
