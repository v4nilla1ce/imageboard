# **Next.js SSR Deployment on Azure - Step-by-Step Guide**

## **📌 Overview**
This guide outlines all the steps to migrate our project from GitHub Pages/Netlify (SPA) to an **Azure-hosted Next.js SSR app** with a **PostgreSQL database** and **Blob Storage** for image uploads.

---
## **1️⃣ Setting Up Azure Resources**

### **1.1 Create an Azure App Service for Hosting**
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to **App Services** → Click **Create**
3. Choose the following settings:
   - **Runtime**: Node.js 18+
   - **Region**: Choose one close to your users
   - **Plan**: Free Tier (for testing) or a **Basic Plan** for production
   - **Deployment Method**: GitHub Actions (recommended) or use CLI
4. Click **Review + Create** → **Deploy**

### **1.2 Create an Azure PostgreSQL Database**
1. Go to **Azure Portal** → **Azure Database for PostgreSQL**
2. Click **Create PostgreSQL Database**
3. Choose **Single Server** (for simplicity)
4. Set a **Database Name** (e.g., `imageboard`)
5. Note down the **Connection String** for later use

### **1.3 Create Azure Blob Storage for Image Uploads**
1. Navigate to **Storage Accounts** → Click **Create**
2. Choose **Blob Storage**
3. Create a **Container** named `images`
4. Note down the **Storage Connection String**

---
## **2️⃣ Preparing Next.js for Azure Deployment**

### **2.1 Install Required Dependencies**
```sh
npm install next dotenv pg @azure/storage-blob
```

### **2.2 Configure PostgreSQL Database Connection**
Create a new file `lib/db.js`:
```js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.AZURE_POSTGRES_URL,
});

export const query = (text, params) => pool.query(text, params);
```

### **2.3 Configure Blob Storage for Image Uploads**
Create `pages/api/upload.js`:
```js
import { BlobServiceClient } from "@azure/storage-blob";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fileName, fileBuffer } = req.body;
    const blobService = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobService.getContainerClient("images");
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(fileBuffer);
    return res.status(200).json({ url: blockBlobClient.url });
  }
}
```

### **2.4 Set Up Environment Variables**
Create a `.env.local` file with:
```
AZURE_POSTGRES_URL=your_database_url
AZURE_STORAGE_CONNECTION_STRING=your_storage_connection
```

---
## **3️⃣ Deploying Next.js to Azure**

### **3.1 Set Up Azure CLI**
```sh
npm install -g azure-functions-core-tools@4 --unsafe-perm true
az login
```

### **3.2 Deploy Next.js to Azure App Service**
```sh
az webapp up --name my-nextjs-app --resource-group my-resource-group --runtime "NODE|18-lts"
```

### **3.3 Run Next.js in Production Mode**
```sh
npm run build
npm start
```

### **3.4 Restart Azure App Service to Apply Changes**
```sh
az webapp restart --name my-nextjs-app --resource-group my-resource-group
```

---
## **4️⃣ Configuring Custom Domain**

### **4.1 Assign a Custom Domain**
1. Go to **Azure App Service** → **Custom Domains**
2. Add your domain (e.g., `myimageboard.com`)
3. Configure **DNS Settings** (CNAME & A Record)
4. Enable **SSL (HTTPS)** for security

---
## **🎯 Final Notes**
✅ **Next.js SSR is hosted on Azure**
✅ **Azure PostgreSQL for database**
✅ **Azure Blob Storage for image uploads**
✅ **Custom domain support**

🚀 We are now fully running our SSR-based imageboard on Azure!

