var Global = require("../Global.js");

/**
 * Utilitário para o banco de dados
 */
module.exports = {
  /**
   * escreve no banco de dados
   * 
   * @param {String} source caminho do banco de dados
   * @param {String | Number | Boolean | Array | Object} value dado a ser guardado.
   * @param {Function | null} callback (opcional) função a ser executada quando terminar de escrever
   */
  write: (source, value, callback) => {
    var reference = Global.db.ref(source);

    //escreve os valores, então...
    reference.set(value).then(() => {
      //caso exista o valor callback
      if (callback) {
        (callback)(); //executa
      }
    });
  },

  /**
   * Lê o banco de dados
   * 
   * @param {String} source caminho do banco de dados
   * @param {Function} callback função a ser executada quando terminar de ler
   */
  read: (source, callback) => {
    var reference = Global.db.ref(source);
    reference.get(source).then((data) => (callback)(data));
  },

  /**
   * deleta algo no banco de dados
   * 
   * @param {String} source caminho do banco de dados
   * @param {Function | null} callback (opcional) função a ser executada quando terminar de escrever
   */
  "delete": (source,callback) => {
    var reference = Global.db.ref(source);

    //escreve os valores, então...
    reference.set(null).then(() => {
      //caso exista o valor callback
      if (callback) {
        (callback)(); //executa
      }
    });
  }
}