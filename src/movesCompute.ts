export interface QiziDesc { label: string, side: 'red' | 'black' }
interface Coord {
  x: number
  y: number
}
// 0,0在左上角
function toCoord(location: number) {
  return {
    x: location % 9,
    y: Math.floor(location / 9),
  }
}
function toLocation(coord: Coord) {
  return coord.y * 9 + coord.x
}
function toLocation2(coord: [number, number]) {
  return coord[1] * 9 + coord[0]
}
function isValid(c: Coord) {
  return c.x >= 0 && c.x < 9 && c.y >= 0 && c.y < 10
}
function isEqual(c: Coord, xy: [number, number]) {
  return c.x === xy[0] && c.y === xy[1]
}

export function computeAvailableLocations(location: number, qizi: QiziDesc, situation: QiziDesc[]): number[] {
  if (qizi.label === '兵') {
    if (location >= 45) {// 兵没有过河
      return [location - 9] // 只能直走
    } else {
      if (location % 9 === 0) { // 九路边兵
        return [location - 9, location + 1]// 直走，右拐
      }
      if (location % 9 === 8) { // 一路边兵
        return [location - 9, location - 1]// 直走，左拐
      }
      return [location - 9, location + 1, location - 1]// 只能直走,左右拐
    }
  } else if (qizi.label === '卒') {
    if (location < 45) {// 卒未过河
      return [location + 9]
    } else {
      if (location % 9 === 8) {
        return [location + 9, location - 1] // 直走，右拐
      }
      if (location % 9 === 0) {
        return [location + 9, location + 1] // 直走，左拐
      }
      return [location + 9, location + 1, location - 1] // 只能直走,左右拐
    }
  } else if (qizi.label === '炮' || qizi.label === '砲') {
    const co = toCoord(location)
    const al = []
    // left
    for (let i = co.x - 1; i >= 0; i--) {
      const c = {
        x: i,
        y: co.y,
      }
      let l = toLocation(c)
      if (situation[l]) {
        for (let j = i - 1; j >= 0; j--) {
          l = toLocation({
            x: j,
            y: co.y,
          })
          if (situation[l] && situation[l].side !== situation[location].side) {
            al.push(l)
            break
          }
        }
        break
      } else {
        al.push(l)
      }
    }
    // right
    for (let i = co.x + 1; i < 9; i++) {
      const c = {
        x: i,
        y: co.y,
      }
      let l = toLocation(c)
      if (situation[l]) {
        for (let j = i + 1; j < 9; j++) {
          l = toLocation({
            x: j,
            y: co.y,
          })
          if (situation[l] && situation[l].side !== situation[location].side) {
            al.push(l)
            break
          }
        }
        break
      } else {
        al.push(l)
      }
    }
    // top
    for (let i = co.y - 1; i >= 0; i--) {
      const c = {
        x: co.x,
        y: i,
      }
      let l = toLocation(c)
      if (situation[l]) {
        for (let j = i - 1; j >= 0; j--) {
          l = toLocation({
            x: co.x,
            y: j,
          })
          if (situation[l] && situation[l].side !== situation[location].side) {
            al.push(l)
            break
          }
        }
        break
      } else {
        al.push(l)
      }
    }
    // bottom
    for (let i = co.y + 1; i < 10; i++) {
      const c = {
        x: co.x,
        y: i,
      }
      let l = toLocation(c)
      if (situation[l]) {
        for (let j = i + 1; j <10; j++) {
          l = toLocation({
            x: co.x,
            y: j,
          })
          if (situation[l] && situation[l].side !== situation[location].side) {
            al.push(l)
            break
          }
        }
        break
      } else {
        al.push(l)
      }
    }
    return al
  } else if (qizi.label === '車') {
    const co = toCoord(location)
    const al = []
    // left
    for (let i = co.x - 1; i >= 0; i--) {
      const c = {
        x: i,
        y: co.y,
      }
      let l = toLocation(c)
      if (situation[l]) {
        if (situation[l].side !== situation[location].side) {
          al.push(l)
        }
        break
      } else {
        al.push(l)
      }
    }
    // right
    for (let i = co.x + 1; i < 9; i++) {
      const c = {
        x: i,
        y: co.y,
      }
      let l = toLocation(c)
      if (situation[l]) {
        if (situation[l].side !== situation[location].side) {
          al.push(l)
        }
        break
      } else {
        al.push(l)
      }
    }
    // top
    for (let i = co.y - 1; i >= 0; i--) {
      const c = {
        x: co.x,
        y: i,
      }
      let l = toLocation(c)
      if (situation[l]) {
        if (situation[l].side !== situation[location].side) {
          al.push(l)
        }
        break
      } else {
        al.push(l)
      }
    }
    // bottom
    for (let i = co.y + 1; i < 10; i++) {
      const c = {
        x: co.x,
        y: i,
      }
      let l = toLocation(c)
      if (situation[l]) {
        if (situation[l].side !== situation[location].side) {
          al.push(l)
        }
        break
      } else {
        al.push(l)
      }
    }
    return al
  } else if (qizi.label === '馬') {
    const co = toCoord(location)
    const al = []
    // top
    if (co.y > 1 && !situation[location - 9]) { // 未被别腿
      if (co.x > 0) {
        const l = toLocation({
          x: co.x - 1,
          y: co.y - 2
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
      if (co.x < 8) {
        const l = toLocation({
          x: co.x + 1,
          y: co.y - 2
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    // bottom
    if (co.y < 9 && !situation[location + 9]) { // 未被别腿
      if (co.x > 0) {
        const l = toLocation({
          x: co.x - 1,
          y: co.y + 2
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
      if (co.x < 8) {
        const l = toLocation({
          x: co.x + 1,
          y: co.y + 2
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    // left
    if (co.x > 1 && !situation[location - 1]) { // 未被别腿
      if (co.y > 0) {
        const l = toLocation({
          x: co.x - 2,
          y: co.y - 1
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
      if (co.y < 9) {
        const l = toLocation({
          x: co.x -2,
          y: co.y + 1
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    // right
    if (co.x < 7 && !situation[location + 1]) { // 未被别腿
      if (co.y > 0) {
        const l = toLocation({
          x: co.x + 2,
          y: co.y - 1
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
      if (co.y < 9) {
        const l = toLocation({
          x: co.x + 2,
          y: co.y + 1
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    return al
  } else if (qizi.label === '象') {
    const co = toCoord(location)
    const al = []
    // 1
    let eye = {
      x: co.x - 1,
      y: co.y - 1,
    }
    if (isValid(eye)) {
      const eyeLoc = toLocation(eye)
      if (eyeLoc < 45 && !situation[eyeLoc]) {
        const l = toLocation({
          x: co.x - 2,
          y: co.y - 2,
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    // 2
    eye = {
      x: co.x + 1,
      y: co.y - 1,
    }
    if (isValid(eye)) {
      const eyeLoc = toLocation(eye)
      if (eyeLoc < 45 && !situation[eyeLoc]) {
        const l = toLocation({
          x: co.x + 2,
          y: co.y - 2,
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    // 3
    eye = {
      x: co.x - 1,
      y: co.y + 1,
    }
    if (isValid(eye)) {
      const eyeLoc = toLocation(eye)
      if (eyeLoc < 45 && !situation[eyeLoc]) {
        const l = toLocation({
          x: co.x - 2,
          y: co.y + 2,
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    // 4
    eye = {
      x: co.x + 1,
      y: co.y + 1,
    }
    if (isValid(eye)) {
      const eyeLoc = toLocation(eye)
      if (eyeLoc < 45 && !situation[eyeLoc]) {
        const l = toLocation({
          x: co.x + 2,
          y: co.y + 2,
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    return al
  } else if (qizi.label === '相') {
    const co = toCoord(location)
    const al = []
    // TODO 此处分四个方形判断是否象眼被塞，可以优化写法。参考后面將帅的走法。
    // 1
    let eye = {
      x: co.x - 1,
      y: co.y - 1,
    }
    if (isValid(eye)) {
      const eyeLoc = toLocation(eye)
      if (eyeLoc > 45 && !situation[eyeLoc]) {
        const l = toLocation({
          x: co.x - 2,
          y: co.y - 2,
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    // 2
    eye = {
      x: co.x + 1,
      y: co.y - 1,
    }
    if (isValid(eye)) {
      const eyeLoc = toLocation(eye)
      if (eyeLoc > 45 && !situation[eyeLoc]) {
        const l = toLocation({
          x: co.x + 2,
          y: co.y - 2,
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    // 3
    eye = {
      x: co.x - 1,
      y: co.y + 1,
    }
    if (isValid(eye)) {
      const eyeLoc = toLocation(eye)
      if (eyeLoc > 45 && !situation[eyeLoc]) {
        const l = toLocation({
          x: co.x - 2,
          y: co.y + 2,
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    // 4
    eye = {
      x: co.x + 1,
      y: co.y + 1,
    }
    if (isValid(eye)) {
      const eyeLoc = toLocation(eye)
      if (eyeLoc > 45 && !situation[eyeLoc]) {
        const l = toLocation({
          x: co.x + 2,
          y: co.y + 2,
        })
        if (!situation[l] || situation[l].side !== qizi.side) {
          al.push(l)
        }
      }
    }
    return al
  } else if (qizi.label === '士') {
    const co = toCoord(location)
    if (
      isEqual(co, [3, 0]) 
      || isEqual(co, [5, 0])
      || isEqual(co, [3, 2])
      || isEqual(co, [5, 2])
    ) {
      return [toLocation2([4, 1])]
    }
    if (isEqual(co, [4, 1])) {
      return [
        toLocation2([3, 0]),
        toLocation2([5, 0]),
        toLocation2([3, 2]),
        toLocation2([5, 2]),
      ]
    }
  } else if (qizi.label === '仕') {
    const co = toCoord(location)
    if (
      isEqual(co, [3, 7]) 
      || isEqual(co, [5, 7])
      || isEqual(co, [3, 9])
      || isEqual(co, [5, 9])
    ) {
      return [toLocation2([4, 8])]
    }
    if (isEqual(co, [4, 8])) {
      return [
        toLocation2([3, 7]),
        toLocation2([5, 7]),
        toLocation2([3, 9]),
        toLocation2([5, 9]),
      ]
    }
  } else if (qizi.label === '將') {
    const co = toCoord(location)
    const valids: [number, number][] = [
      [3, 0], [4, 0], [5, 0],      
      [3, 1], [4, 1], [5, 1],      
      [3, 2], [4, 2], [5, 2]     
    ]
    const allowed: [number, number][] = [
      [co.x - 1, co.y],
      [co.x + 1, co.y],
      [co.x, co.y - 1],
      [co.x, co.y + 1]
    ]
    return allowed.filter(e => {
      console.log(e)
      return valids.some(d => (e[0] === d[0] && e[1] === d[1]))
    }).map(e => toLocation2(e))
  } else if (qizi.label === '帥') {
    const co = toCoord(location)
    const valids: [number, number][] = [
      [3, 7], [4, 7], [5, 7],      
      [3, 8], [4, 8], [5, 8],      
      [3, 9], [4, 9], [5, 9]     
    ]
    const allowed: [number, number][] = [
      [co.x - 1, co.y],
      [co.x + 1, co.y],
      [co.x, co.y - 1],
      [co.x, co.y + 1]
    ]
    return allowed.filter(e => valids.some(d => (e[0] === d[0] && e[1] === d[1]))).map(e => toLocation2(e))
  }
  return []
}
