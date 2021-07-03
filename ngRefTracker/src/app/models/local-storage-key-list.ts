// utility for clearing localStorage upon login and logout
export class LocalStorageKeyList {
  static readonly keyList: string[] = [
    "lastPage",
    "lastSearch",
    "length",
    "lastSearchTerm",
    "lastSearchJournal",
    "username"
  ]

  constructor() {}

  static clear(): void {
    LocalStorageKeyList.keyList.forEach(key => {
      localStorage.removeItem(key);
    });
  }
}
