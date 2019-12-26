package com.github.MaxLebedev2000.model.session;

import com.github.MaxLebedev2000.model.Check;
import com.github.MaxLebedev2000.model.Storage;

import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

public class History implements Storage {

    private List<Check> list;

    public History(){
        this.list = new ArrayList<>();
    }

    @Override
    public void addCheck(Check check) {
        this.list.add(0, check);
    }

    @Override
    public List<Check> getList() {
        return this.list;
    }

    @Override
    public String getJson() {
        StringJoiner joiner = new StringJoiner(",", "[", "]");
        for (Check check: this.list){
            joiner.add(check.getJson());
        }
        return joiner.toString();
    }

    @Override
    public void clean() {
        this.list = new ArrayList<>();
    }
}
