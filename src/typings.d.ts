/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module PolyTest {
  interface Card {
      id: number;
      coverImageUrl: string;
      imageUrl: string;
      isFlipped: boolean;
      isMatched: boolean;
  }
  
  interface Time {
      hour: number;
      minute: number;
      second: number;
  }
}