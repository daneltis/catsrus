export class CatModel {
  id: string;
  url: string;
  original_filename: string;
  width: number;
  height: number;

  constructor() {
    this.id = "";
    this.url = "";
    this.original_filename = "";
    this.width = 0;
    this.height = 0;
  }
}