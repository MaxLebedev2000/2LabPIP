package com.github.MaxLebedev2000.model;

import java.io.Serializable;
import java.util.List;

public interface Storage extends Serializable {

    void addCheck(Check check);

    List<Check> getList();

    String getJson();

    public void clean();
}
