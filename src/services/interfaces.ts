export interface WinnerInfo {
  id: number
  time: number
  wins: number
  car: CarBody
}

export interface CarObject {
  name: string
  color: string
}

export interface CarBody extends CarObject {
  id: number
}

export interface Winner {
  id: number
  wins: number
  time: number
}

export interface Engine {
  velocity: number
  distance: number
}

export interface Drive {
  success: boolean
}
