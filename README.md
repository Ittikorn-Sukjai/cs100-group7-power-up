# My Learning Portfolios

เว็บแอปสำหรับบันทึก Portfolio และ Portfolio Item ของผู้เรียน 2 คน ได้แก่ Person 1 และ Person 2 โดยข้อมูลและผลงานของแต่ละคนถูกเก็บแยกกัน

## ความสามารถ

- มี Portfolio แบบกำหนดตายตัว 2 ชุด: Person 1 และ Person 2
- เลือก Person ที่ต้องการกรอกข้อมูลได้
- บันทึกข้อมูล Portfolio ได้แก่ ชื่อ Portfolio, ชื่อที่แสดง, What I Enjoy, What I've Tried และ What I'm Curious About
- เพิ่ม Portfolio Item ให้ Person ที่เลือกเท่านั้น
- Portfolio Item ประกอบด้วย Title, Type, Date, Role, Description, Skills, Reflection และ Evidence URL
- แสดงจำนวน Items ของแต่ละ Person
- มี Preview Portfolio สำหรับดูข้อมูลและผลงานของ Person ที่เลือกหลังบันทึก
- ตรวจสอบข้อมูลที่จำเป็นต้องกรอก รวมถึงรูปแบบวันที่และ URL
- บันทึกและอ่านข้อมูลด้วย `localStorage` เพื่อให้ข้อมูลยังอยู่หลังรีเฟรชหน้าเว็บ

## การใช้งาน

1. เปิดไฟล์ `index.html` ด้วยเว็บเบราว์เซอร์
2. เลือก Person 1 หรือ Person 2 จากรายการ Portfolio
3. กรอกข้อมูล Portfolio แล้วกด **บันทึกข้อมูล Portfolio**
4. กรอกข้อมูล Portfolio Item แล้วกด **บันทึก Portfolio Item**
5. ดูข้อมูลของ Person ที่เลือกในส่วน **Preview Portfolio** ด้านล่าง

## การแยกข้อมูล Multiple Portfolios

ข้อมูลใช้โครงสร้าง `portfolios` ซึ่งมี Person 1 และ Person 2 โดยแต่ละ Person มี `items` ของตัวเอง ตัวอย่างโครงสร้าง:

```js
{
  id: "person-1",
  slotLabel: "Person 1",
  name: "ชื่อ Portfolio",
  items: [
    {
      title: "ชื่อผลงาน",
      type: "Course Assignment"
    }
  ]
}
```

เมื่อบันทึก Item ระบบจะเพิ่มข้อมูลลงใน `portfolio.items` ของ Person ที่กำลังเลือก จึงไม่ปะปนกับข้อมูลของอีก Person

## โครงสร้างไฟล์

```text
CS100-group 7/
├── index.html                 # โครงสร้างหน้าเว็บและฟอร์ม
├── css/
│   └── style.css              # รูปแบบและการจัดหน้าจอ
├── js/
│   └── app.js                 # การจัดการข้อมูล, Validation, Preview และ localStorage
├── sample-portfolio-1.json    # ข้อมูลตัวอย่างของคนที่ 1
└── sample-portfolio-2.json    # ข้อมูลตัวอย่างของคนที่ 2
```

## ตำแหน่งโค้ดสำคัญ

| ส่วน | ไฟล์ | รายละเอียด |
| --- | --- | --- |
| Multiple Portfolios | `js/app.js` | กำหนด Person 1 และ Person 2 ใน `demoPortfolios` |
| Save & Load | `js/app.js` | ฟังก์ชัน `loadPortfolios()` และ `savePortfolios()` |
| Validation | `index.html`, `js/app.js` | `required`, `type="date"`, `type="url"` และ `checkValidity()` |
| Preview | `index.html`, `js/app.js`, `css/style.css` | ส่วน `Preview Portfolio` และฟังก์ชัน `renderPreview()` |

## ข้อควรรู้

- เว็บใช้ Bootstrap ผ่าน CDN สำหรับรูปแบบพื้นฐานของหน้าเว็บ
- ข้อมูลที่ผู้ใช้กรอกจริงถูกเก็บใน `localStorage` ด้วย key `cs100-two-fixed-people-v2`
- ไฟล์ JSON ตัวอย่างเป็นข้อมูลอ้างอิงแยกตามคน แต่เว็บปัจจุบันยังไม่ได้อ่าน JSON เข้ามาใช้งานโดยอัตโนมัติ
