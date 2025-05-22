module bluetune::utils;

public fun get_percent(amount: u64, percent: u64, decimals: u16): u64 {
    let scale = pow(100, decimals as u64);
    amount * percent / scale
}

fun pow(base: u64, exp: u64): u64 {
    let mut result = 1;
    let mut i = 0;
    while (i < exp) {
        result = result * base;
        i = i + 1;
    };
    result
}