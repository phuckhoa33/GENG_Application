export const experpt = (str, count) => {
    if(str?.length > count){
      str = str?.substring(0, count) + "...";
    }
    return str;
}