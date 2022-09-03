# 老爸的記帳本


# 介紹
簡單實作記帳的網頁

# 功能
- 使用者可註冊並登入帳號
- 使用者註冊帳號時密碼經過雜湊處理不輕易洩漏密碼
- 使用者可使用facebook登入帳號
- 使用者可查看自己所建立的支出列表
- 使用者可依據篩選類別或全部總計金額
- 使用者可以篩選分類並顯示符合該分類之支出明細
- 新增、修改、刪除支出明細功能

# 環境配置需求
- MongoDB
- nodemon

# 開始使用
1.將專案clone到本機
   ```bash
git clone https://github.com/LoisChen68/expense-tracker.git
   ```
2.進入專案資料夾
   ```bash
cd expense-tracker
   ```
3.安裝所需的依賴
   ```bash
npm install
   ```
4.根據 .env.example 在 .env文件中設置環境變量

5.使用種子資料
```bash
npm run seed
```
5.啟動伺服器
```bash
npm run dev
```
6.看到以下消息，代表執行成功
```bash
Express is running on the http://localhost:3000
mongodb connected!
```
