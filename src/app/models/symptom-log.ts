export interface SymptomLog {
  id?: number;         
  user_id: number;
  symptom_id: number;
  log_time: string;  
  severity: number;
  note?: string;       
  name?: string;       
  f_name?: string;     
  l_name?: string;     
}
