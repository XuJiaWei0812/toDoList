import pymysql

class Connect():
    def get_sql_conn(self):
        conn= pymysql.connect(host="127.0.0.1",user="root",password="00000",db="to_do_list")
        cursor = conn.cursor()
        return conn,cursor

    def get_index_dict(self,cursor):
        index_dict=dict()
        index=0
        for desc in cursor.description:
            index_dict[desc[0]]=index
            index=index+1
        return index_dict

    def get_dict_data_sql(self,cursor,sql,tuple):
        cursor.execute(sql,tuple)
        data=cursor.fetchall()
        index_dict=self.get_index_dict(cursor)
        res=[]
        for datai in data:
            resi=dict()
            for indexi in index_dict:
                resi[indexi]=datai[index_dict[indexi]]
            res.append(resi)
        return res
