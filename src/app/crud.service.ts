import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CrudService {
public url="https://firbase-c387d-default-rtdb.asia-southeast1.firebasedatabase.app/test.json";
  constructor(private http: HttpClient) { }


  addData(data) {
    return this.http.post<any>(this.url, data);
  }

  deleteData(id) {
    return this.http.delete('https://firbase-c387d-default-rtdb.asia-southeast1.firebasedatabase.app/test/'+id+'.json');
  }

  editData(id,data) {
    return this.http.put<any>('https://firbase-c387d-default-rtdb.asia-southeast1.firebasedatabase.app/test/'+id+'.json',data);
  }
  getData() {
    return this.http.get<any>(this.url).pipe(
    
      map(res=>{
        const arr =[];
        for(const key in res) {
          if(res.hasOwnProperty(key)) {
            arr.push({id:key ,...res[key]});

          }
        }
        return arr;
      })
    );
  }
}
