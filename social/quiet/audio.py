#!/usr/bin/env python3
"""The reel sound: the site's own ambience, rendered. Detuned sine pairs on the hour's chord, a slow
breathing swell, a whisper of low-passed wind. Nothing recorded, nothing licensed. Two hours given
(maghrib,isha) crossfade across the reel. 48 kHz, as Instagram wants it.
    python3 audio.py <hour[,hour]> <seconds> <out.wav>"""
import sys, wave, numpy as np
CH = {"fajr": [220.0, 277.18, 329.63, 440.0], "morning": [196.0, 246.94, 293.66, 392.0], "dhuhr": [174.61, 220.0, 261.63, 349.23],
      "asr": [164.81, 207.65, 246.94, 329.63], "maghrib": [146.83, 174.61, 220.0, 293.66], "isha": [110.0, 130.81, 164.81, 220.0]}
hours, secs, out = sys.argv[1].split(","), float(sys.argv[2]), sys.argv[3]
SR = 48000; t = np.arange(int(secs * SR)) / SR
def pad(chord):
    y = np.zeros_like(t)
    for i, f in enumerate(chord):
        g = 0.12 / (i + 1) + 0.04
        y += g * (np.sin(2 * np.pi * f * t) + np.sin(2 * np.pi * f * 1.003 * t + 0.7))
    return y
if len(hours) == 1: y = pad(CH[hours[0]])
else:
    k = np.clip((t - secs * 0.35) / (secs * 0.4), 0, 1); k = k * k * (3 - 2 * k)
    y = pad(CH[hours[0]]) * (1 - k) + pad(CH[hours[1]]) * k
y *= 0.75 + 0.25 * np.sin(2 * np.pi * t / 8 - np.pi / 2)
rng = np.random.default_rng(99); n = rng.standard_normal(len(t)); a = 0.995; w = np.zeros_like(n); acc = 0.0
for i in range(len(n)):
    acc = a * acc + (1 - a) * n[i]; w[i] = acc
y += w / (np.abs(w).max() + 1e-9) * 0.05
fade = np.minimum(1, np.minimum(t / 0.6, (secs - t) / 1.4).clip(0, 1)); y *= fade
d = int(0.31 * SR); z = y.copy()
for i in range(d, len(y)): z[i] += 0.28 * z[i - d]
y = z / (np.abs(z).max() + 1e-9) * 0.5
st = np.stack([y, np.roll(y, 240)], 1)
with wave.open(out, "wb") as f:
    f.setnchannels(2); f.setsampwidth(2); f.setframerate(SR); f.writeframes((st * 32767).astype(np.int16).tobytes())
print("audio", out, f"{secs:.0f}s", "+".join(hours))
