package com.github.MaxLebedev2000.model;

public class Check {

    private static String format = "{\"x\":\"%s\", \"y\":\"%s\", \"r\":\"%s\", \"result\":\"%s\"}";

    private double x;
    private double y;
    private double r;

    private boolean result;

    public Check(double x, double y, double r, boolean result) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getResult() {
        return result;
    }

    public String getJson(){
        return String.format(format,
                String.valueOf(x),
                String.valueOf(y),
                String.valueOf(r),
                String.valueOf(result));
    }

}
