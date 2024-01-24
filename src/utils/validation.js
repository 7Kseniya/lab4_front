export const isInsideCircle = (x, y, r) => x * x + y * y <= r * r

export const isInsideRectangle = (x, y, height, width) => Math.abs(x) <= width && Math.abs(y) <= height

export const isInsideRhombus = (x, y, height, width) => Math.abs(x) / width + Math.abs(y) / height <= 1



