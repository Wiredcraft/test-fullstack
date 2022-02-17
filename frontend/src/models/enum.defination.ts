export namespace Enums {
  /**
   * レイアウト種別
   */
  export enum LayoutTemplate {
    /**
     * 認証不要レイアウト
     */
    Default = 0,
    /**
     * 認証必須レイアウト
     */
    Authed = 1,
  }

  /**
   * メッセージ種別
   */
  export enum MessageType {
    /**
     * 情報
     */
    Info = 'info',
    /**
     * 成功
     */
    Success = 'success',
    /**
     * 警告
     */
    Warn = 'warn',
    /**
     * エラー
     */
    Error = 'error',
  }

  /**
   * 編集種別
   */
  export enum EditorType {
    None = 0,
    /**
     * 新規
     */
    Insert = 1,
    /**
     * 更新
     */
    Update = 2,
    /**
     * 削除
     */
    Delete = 3,
  }

  export enum SearchMatchMethod {
    Full = 1,
    StartWith = 2,
    EndWith = 3,
    Partial = 4,
  }

  export enum Gender {
    /**
     * 女性
     */
    Female = 0,
    /**
     * 男性
     */
    Male = 1,
    /**
     * 不明
     */
    Unknow = 2,
  }

  /**
   * 入力補助種別
   */
  export enum InputSuggestionType {
    /**
     * 標榜診療科
     */
    ClinicalDepartment = 1,
    // 専門医資格
    SpecialistQualification = 2,
    // 得意な部位
    GoodPartAndOrgan = 3,
    // 得意な疾患・症候
    GoodDiseaseAndSymptom = 4,
    // 得意な診断・診察
    GoodDiagnosisAndMedical = 5,
    // 得意な治療・手術・手技
    GoodTreatment = 6,
    // 紹介されても困る症例
    BotherPoint = 7,
    // 機器名
    DeviceName = 7,
    // 検査法
    InspectionMethod = 8,
    // 部位
    Part = 9,
    // 持ち物
    TakeWith = 11,
  }

  /**
   * ロール
   */
  export enum Role {
    Normal = 1,
    Super = 9,
  }

  /**
   * 治療場所
   */
  export enum TreatmentPlace {
    None = null,
    /**
     * 来院
     */
    Clinic = 1,
    /**
     * オンライン
     */
    Online = 2,
    /**
     * 往診
     */
    HouseCall = 3,
    /**
     * その他
     */
    Other = 4,
  }
}
