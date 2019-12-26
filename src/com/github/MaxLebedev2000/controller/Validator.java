package com.github.MaxLebedev2000.controller;

import javax.servlet.http.HttpServletRequest;

public interface Validator {

    String validate(HttpServletRequest req);

}
