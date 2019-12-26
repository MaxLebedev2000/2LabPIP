package com.github.MaxLebedev2000.controller.servlet;

import com.github.MaxLebedev2000.controller.Validator;
import com.github.MaxLebedev2000.model.Storage;
import com.github.MaxLebedev2000.model.session.History;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.StringJoiner;

public class ControllerServlet extends HttpServlet {

    private Validator validator = (req) -> {

        StringJoiner joiner = new StringJoiner(",");

        try {
            double x = Double.valueOf(req.getParameter("x"));
        } catch (Exception e){
            joiner.add("X");
        }

        try {
            double y = Double.valueOf(req.getParameter("y"));
        } catch (Exception e){
            joiner.add("Y");
        }

        try {
            double r = Double.valueOf(req.getParameter("r"));
        } catch (Exception e){
            joiner.add("R");
        }


        if (joiner.length() == 0){
            return "true";
        } else {
            return "Значения " + joiner.toString() + " не инициализированы, либо являются некорректными";
        }
    };

    public ControllerServlet(){ }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getParameter("getlist") != null){
            resp.getWriter().
                    write(((Storage)req.getSession().getAttribute("storage")).getJson());
            return;
        }
        forward(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getSession().getAttribute("storage") == null){
            req.getSession().setAttribute("storage", new History());
            String url = resp.encodeRedirectURL("controller");
            resp.sendRedirect(url);
            return;
        }

        RequestDispatcher dispatcher = req.
                getRequestDispatcher("page.jsp");

        req.setAttribute("storage", req.getSession().getAttribute("storage"));

        dispatcher.forward(req, resp);

    }




    private void forward(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String validate = validator.validate(req);

        if (validate.equals("true")) {
            req.setAttribute("valid", "true");
            req.getRequestDispatcher("check").forward(req, resp);

        } else {
            req.setAttribute("error", validate);
            req.setAttribute("storage", req.getSession().getAttribute("storage"));
            req.getRequestDispatcher("page.jsp").forward(req, resp);
        }

    }


}
