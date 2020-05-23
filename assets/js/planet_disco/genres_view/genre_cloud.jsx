import React, { useEffect, useMemo } from 'react'
import { useUpdate } from 'react-three-fiber'
import { Quaternion } from 'three/src/math/Quaternion'
import { Vector3 } from 'three/src/math/Vector3'
import { Matrix4 } from 'three/src/math/Matrix4'
import { DynamicDrawUsage } from 'three/src/constants'
import { scalePow, scaleLinear } from 'd3-scale'

// const radScale = scalePow().domain([0.0001, 0.0062]).range([0.09, 0.7, 1])
const radScale = scalePow().domain([0.0001, 0.007]).range([0.2, 1.5])

export default ({ genres, color }) => {

  const mesh = useUpdate((mesh) => {
    const matrix = new Matrix4()
    genres.forEach(({ pagerank, coord: {x, y, z} }, i) => {
      const s = radScale(pagerank)
      matrix.compose(new Vector3(x, y, z), new Quaternion(), new Vector3(s, s, s))
      mesh.setMatrixAt(i, matrix)
    })
    mesh.instanceMatrix.setUsage(DynamicDrawUsage)
  }, [])

  return <instancedMesh ref={mesh} args={[null, null, genres.length]} castShadow>
    <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
    <meshStandardMaterial
      attach="material"
      color={color}
      transparent
      opacity={1}
      // wireframe
    />
  </instancedMesh>
}
