export default class ArrayExtensions {

  // custom function to convert an array into a obj literal
  static indexByKeyName(arr, keyName) {
    // indexed by keys of our choosing
    return arr.reduce((obj, el) =>
      ({ ...obj, [el[keyName]]: el }), {});
  }
}
