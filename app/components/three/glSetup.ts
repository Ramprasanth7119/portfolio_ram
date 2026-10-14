import type { RootState } from '@react-three/fiber'

// three.js calls gl.getProgramInfoLog(...).trim() while checking shaders; after a lost
// WebGL context that log is null and the page crashes. Every material here is built in,
// so the check adds nothing.
export function disableShaderErrorCheck({ gl }: RootState) {
  gl.debug.checkShaderErrors = false
}
