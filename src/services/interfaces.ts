export interface CarObject {
  id: number
  name: string
  color: string
}

export interface WinnerInfo {
  id: number
  time: number
  wins: number
  car: CarObject
}
