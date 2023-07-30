# Graduation-Project
Set up (for dev):
1. Install (optional) Microsoft SQL Server Management Studio (SSMS), visual studio, visual studio code
2. Open SSMS and create new database ex: "englishcenter"
3. Open the appsettings.json file (~\Graduation-Project\Backend\EnglishCenterManagement) and change the DefaultConnection field with the Connection String from the database just created in step 2
4. Open Package Manager Console (in visual studio) -> enter command line: "update-database"
   ![image](https://github.com/ngothilinh20187179/Graduation-Project/assets/74759189/832f9b75-1f92-4b38-a631-cdc1dcad2286)
   ![Untitled](https://github.com/ngothilinh20187179/Graduation-Project/assets/74759189/92a4f11c-e9cd-4bef-b3f1-d6bfba4d0661)
5. Run BE in EnglishCenterManagement.sln (~\Graduation-Project\Backend), the window with path "https://localhost:7054/swagger/index.html" open
  ![image](https://github.com/ngothilinh20187179/Graduation-Project/assets/74759189/b069153d-f005-4174-b8d0-02ff6b243499)
6. ~\Graduation-Project\Frontend Web contains 3 projects about FE, open one and run: "yarn install" -> "yarn start" to see the results, ex:
  ![image](https://github.com/ngothilinh20187179/Graduation-Project/assets/74759189/f178573e-b464-4cdb-8778-280163305b8e)
