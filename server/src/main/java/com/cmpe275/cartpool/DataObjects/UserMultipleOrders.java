package com.cmpe275.cartpool.DataObjects;

import java.util.List;

public class UserMultipleOrders {
    int user_id;
    List<Integer> order_ids;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public List<Integer> getOrder_ids() {
        return order_ids;
    }

    public void setOrder_ids(List<Integer> order_ids) {
        this.order_ids = order_ids;
    }
}
