/* eslint-disable no-console */
/* eslint-disable func-names */
/*
* convert TSV to JSON
* @param
* tsv: tab seperated values (with header)
* 
* @return
* JSON string
*/
export const tsv2JSON = function tsv2JSON (tsv) {

  const lines=tsv.split("\n");
  
  const result = [];
  
  const headers=lines[0].split("\t");
  
  for(let i = 1;i < lines.length; i += 1) {

    const obj = {};
    const currentline=lines[i].split("\t");

    for(let j=0;j<headers.length; j += 1){
        obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  // return result; //JavaScript object
  return JSON.stringify(result); // JSON
}

/*
* convert XLSX to JSON
* @param
* file: xlsx file path
* 
* @return
* JSON string
*/
export const excel2JSON = function excel2JSON(file, callback) {
  const reader = new FileReader();

  reader.onload = function(e) {
    const data = e.target.result;
    const workbook = XLSX.read(data, {
      type: 'binary'
    });

    workbook.SheetNames.forEach(function(sheetName) {
      // Here is your object
      const XLRowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      if (XLRowObject.length > 0)
        callback(XLRowObject);
      
      // var json_object = JSON.stringify(XL_row_object);
      // console.log(json_object);
    })

  };

  reader.onerror = function(ex) {
    console.log(ex);
  };

  reader.readAsBinaryString(file);
};
