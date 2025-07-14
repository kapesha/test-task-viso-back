import { loginUser, registerUser } from "../services/authService.js";

export async function register(req, res) {
  const { username, password } = req.body;
  try {
    await registerUser(username, password);
    res.status(201).json({ message: 'user register ok' });
  } catch (e) {
    if (e.message === 'user already existed') {
      return res.status(400).json({ message: e.message });
    }
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const token = await loginUser(username, password);
    res.json({ token });
  } catch (e) {
    if (e.message === 'data is not valid') {
      return res.status(400).json({ message: e.message });
    }
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
}