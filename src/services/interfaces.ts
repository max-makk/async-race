export interface CarBody {
  id: number
  name: string
  color: string
}

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

export interface Winner {
  id: number,
  wins: number,
  time: number
}
