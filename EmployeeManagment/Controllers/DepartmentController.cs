using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataAccess;
using Domain;

namespace EmployeeManagment.Controllers
{
    public class DepartmentController : Controller
    {
        //
        // GET: /Department/


        public Entities db = new Entities();


        public ActionResult Index()
        {
            var efData = db.tblDepartments.Where(x => x.IsActive == true).ToList();

            return View(efData);
        }

        public ActionResult Save(string deptName, int deptId)
        {
            var efData = db.tblDepartments.Where(x => x.Id == deptId).FirstOrDefault();
            try
            {
                if (efData == null)
                {
                    efData = new tblDepartment();
                    db.tblDepartments.Add(efData);
                }
                efData.Id = deptId;
                efData.Name = deptName;
                efData.IsActive = true;
                db.SaveChanges();
                return Json("Ok");
            }
            catch (Exception ex)
            {
                
               return Json(ex.Message);
            }
        }

        public ActionResult Delete(int deptId)
        {
            var efData = db.tblDepartments.Where(x => x.Id == deptId).FirstOrDefault();
            if (efData != null)
            {
                efData.IsActive = false;
                db.SaveChanges();
            }
            return Json("Ok");
        }

        public ActionResult GetDataById(int deptId)
        {
            tblDepartment mDepartment = new tblDepartment();
            var efData = db.tblDepartments.Where(x => x.Id == deptId).FirstOrDefault();
            if (efData != null)
            {
                mDepartment.Name=efData.Name;
                mDepartment.Id=efData.Id;
            }
            return Json(mDepartment);
        }

    }
}
