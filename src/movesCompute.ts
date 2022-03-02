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
function isValid(c: Coord) {
  return c.x >= 0 && c.x < 9 && c.y >= 0 && c.y < 10
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
  }
  if (qizi.label === '卒') {
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
  }
  
  return []
}
