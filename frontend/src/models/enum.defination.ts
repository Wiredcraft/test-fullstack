export namespace Enums {
  export enum LayoutTemplate {
    Default = 0,
    Authed = 1,
  }

  export enum EditorType {
    None = 0,
    Insert = 1,
    Update = 2,
    Delete = 3,
  }

  export enum SearchMatchMethod {
    Full = 1,
    StartWith = 2,
    EndWith = 3,
    Partial = 4,
  }

  export enum Role {
    Normal = 1,
    Super = 9,
  }
}
