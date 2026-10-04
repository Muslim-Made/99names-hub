#!/usr/bin/env python3
"""The reel sound: the site's own ambience, rendered. Four detuned sine pairs on the hour's
chord, a slow breathing swell, a whisper of low-passed wind. Nothing recorded, nothing licensed.
    python3 audio.py <reel 1-4> <seconds> <out.wav>"""
import sys, wave, numpy as np
CH = {"fajr": [220.0, 277.18, 329.63, 440.0], "morning": [196.0, 246.94, 293.66, 392.0], "dhuhr": [174.61, 220.0, 261.63, 349.23],
      "asr": [164.81, 207.65, 246.94, 329.63], "maghrib": [146.83, 174.61, 220.0, 293.66], "isha": [110.0, 130.81, 164.81, 220.0]}
HOURS = ["fajr", "morning", "dhuhr", "asr", "maghrib", "isha"]
r, secs, out = int(sys.argv[1]), float(sys.argv[2]), sys.argv[3]
SR = 44100; t = np.arange(int(secs * SR)) / SR
def pad(chord, gain=1.0):
    y = np.zeros_like(t)
    for i, f in enumerate(chord):
        g = (0.12 / (i + 1) + 0.04) * gain
        y += g * (np.sin(2 * np.pi * f * t) + np.sin(2 * np.pi * f * 1.003 * t + 0.7))
    return y
if r == 3:   # dawn to night: crossfade the six chords, two seconds each
    y = np.zeros_like(t)
    for i, h in enumerate(HOURS):
        w = np.clip(1 - np.abs(t - (i * 2 + 1)) / 2.2, 0, 1) if i < 5 else np.clip((t - 9.5) / 2.2, 0, 1)
        y += pad(CH[h]) * w
else:
    y = pad(CH[{1: "fajr", 2: "morning", 4: "maghrib"}[r]])
# breathing swell: reel 2 follows the breath (in 1-5, out 5-9, short 9-12); others an 8 s LFO
if r == 2:
    env = np.interp(t, [0, 1, 5, 9, 10.5, 12], [0.55, 0.55, 1.0, 0.55, 0.9, 0.55])
else:
    env = 0.75 + 0.25 * np.sin(2 * np.pi * t / 8 - np.pi / 2)
y *= env
# wind: white noise through a one-pole low-pass, very quiet
rng = np.random.default_rng(99); n = rng.standard_normal(len(t)); a = 0.995; w = np.zeros_like(n); acc = 0.0
for i in range(len(n)):
    acc = a * acc + (1 - a) * n[i]; w[i] = acc
y += w / (np.abs(w).max() + 1e-9) * 0.05
# fades and a touch of room via a short feedback delay
fade = np.minimum(1, np.minimum(t / 0.6, (secs - t) / 1.4).clip(0, 1)); y *= fade
d = int(0.31 * SR); z = y.copy()
for i in range(d, len(y)): z[i] += 0.28 * z[i - d]
y = z / (np.abs(z).max() + 1e-9) * 0.5
st = np.stack([y, np.roll(y, 220)], 1)   # a hair of width
with wave.open(out, "wb") as f:
    f.setnchannels(2); f.setsampwidth(2); f.setframerate(SR); f.writeframes((st * 32767).astype(np.int16).tobytes())
print("audio", out, f"{secs:.0f}s")
