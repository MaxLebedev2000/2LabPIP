package com.github.MaxLebedev2000.model;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class AreaCheckServlet extends HttpServlet {

    private Checker checker = (x, y, r) -> {

        if (x <= 0) {
            if (y <= 0) {
                return (Math.abs(x) < r) && (Math.abs(y) < r/2);
            } else return Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(r, 2);
        }

        if (x > 0) {
            if (y <= 0) {
                return (y>x-r/2)&&(Math.abs(x) < r/2) && (Math.abs(y) < r/2);
            }
        }
        return false;
    };

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doCheck(req, resp);
    }

    private void doCheck(HttpServletRequest req, HttpServletResponse resp) throws IOException {


        String valid = (String) req.getAttribute("valid");

        if (valid == null) {
            resp.sendRedirect("controller");
            return;
        }

        HttpSession session = req.getSession();
        Storage storage = (Storage) session.getAttribute("storage");

        resp.setContentType("text/html; charset=UTF-8");

        String sx = req.getParameter("x");
        String sy = req.getParameter("y");
        String sr = req.getParameter("r");


        double x = Double.valueOf(sx);
        double y = Double.valueOf(sy);
        double r = Double.valueOf(sr);
        if (y >= 0 && sy.length() > 5){
            sy = sy.substring(0, 6);
            y = Double.valueOf(sy);
        } else if (sy.length() > 6) {
            sy = sy.substring(0, 7);
            y = Double.valueOf(sy);
        }

        if (x >= 0 && sx.length() > 5){
            sx = sx.substring(0, 6);
            x = Double.valueOf(sx);
        } else if (sx.length() > 6) {
            sx = sx.substring(0, 7);
            x = Double.valueOf(sx);
        }

        boolean result = checker.check(x, y, r);
        Check check = new Check(x, y, r, result);
        storage.addCheck(check);

        if (req.getParameter("async") != null) {
            resp.getWriter().
                    append(check.getJson()).
                    flush();
        } else {
            resp.sendRedirect("controller");
        }


    }


}
