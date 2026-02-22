const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_STATE = Object.freeze({
  width: 1400,
  height: 900
});

function getStatePath(userDataPath) {
  return path.join(userDataPath, "window-state.json");
}

function loadWindowState(userDataPath) {
  const statePath = getStatePath(userDataPath);
  try {
    if (!fs.existsSync(statePath)) {
      return { ...DEFAULT_STATE };
    }
    const raw = fs.readFileSync(statePath, "utf8");
    const parsed = JSON.parse(raw);
    const width = Number(parsed.width);
    const height = Number(parsed.height);
    const x = Number(parsed.x);
    const y = Number(parsed.y);

    const next = {
      width: Number.isFinite(width) && width > 300 ? width : DEFAULT_STATE.width,
      height: Number.isFinite(height) && height > 300 ? height : DEFAULT_STATE.height
    };

    if (Number.isFinite(x) && Number.isFinite(y)) {
      next.x = x;
      next.y = y;
    }
    return next;
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveWindowState(userDataPath, bounds) {
  const statePath = getStatePath(userDataPath);
  const payload = JSON.stringify(
    {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height
    },
    null,
    2
  );
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, payload, "utf8");
}

module.exports = {
  DEFAULT_STATE,
  loadWindowState,
  saveWindowState
};
