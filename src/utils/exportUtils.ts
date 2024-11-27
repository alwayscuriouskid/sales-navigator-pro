import * as XLSX from 'xlsx';

export const exportToExcel = (data: any[], fileName: string) => {
  console.log('Exporting data to Excel:', { rowCount: data.length, fileName });
  
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
    
    console.log('Excel export completed successfully');
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
};