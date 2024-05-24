# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Future changes
**Fetching data from Kindo Api**
Fetching data from the api will require a cookie in the header.

e.g. Cookie: ezsyssession.shop.tgcl.co.nz=cbafd555cc83352547785c4f1210b36d; _ga=GA1.1.1953207797.1716518066; thegrowthcollectivelimited-_zldp=enAQevcBCes0D6QpgGBOBGcLRas39ClJ9L%2F3y61zgnRyplSSZr85RecoqAL2NdMamKwM1K1ctjo%3D; thegrowthcollectivelimited-_zldt=aed13246-ca0b-4c44-abdc-71defefd1170-2; _ga_3Z8BTZRZE4=GS1.1.1716518066.1.1.1716518587.0.0.0

'''
const date = 2024-05-22 // (example)
Kindo API to get orders: https://shop.tgcl.co.nz/shop/tgweb.aspx?path=%2Fsupplier%2Fosushi%2Forders&start_date=${date}&end_date=${date}&status_list=pending%2Cprocessing%2Ccompleted&non_orders=false
'''

response json format:
{
  "orders":[
        {
            "purchase_id": "da01cd1f81689bf0812e99d5d9071161",
            "status": "pending",
            "school": "Newlands Intermediate School",
            "student_name_in_dict": "Elizabeth",
            "student_room": "Room 03",
            "options": [],
            "index": 0,
            "mcat": "Sushi",
            "member_id": "",
            "product": "Chicken teriyaki - 8 pieces",
            "value": 960,
            "choice": null,
            "student_address": "",
            "student_name": "Elizabeth Yang",
            "order_date": "2024-04-23",
            "contact_name": "Li",
            "contact_phone": "mob-0211305394",
            "email": "lilygaoli@hotmail.com",
            "delivery_date": "2024-05-22",
            "quantity": 1
        }
  ],
  "mcat_prod_dict": {
        "Sushi": [
            "Avocado - 6 pieces",
            "Avocado - 8 pieces",
            "Chicken teriyaki - 4 pieces",
            "Chicken teriyaki - 6 pieces",
            "Chicken teriyaki - 8 pieces",
            "Mixed - 6 pieces",
            "Mixed - 8 pieces",
            "Salmon & Avocado - 4 pieces",
            "Salmon & Avocado - 6 pieces",
            "Salmon & Avocado - 8 pieces",
            "Tuna Mayo - 4 pieces",
            "Tuna Mayo - 6 pieces",
            "Tuna Mayo - 8 pieces",
            "Vegetarian - 4 pieces",
            "Vegetarian - 6 pieces",
            "Vegetarian - 8 pieces"
        ]
    }
}
