const ids = [
	'SaXSYwJ5Gr4V4mwVN-b3nS6NbRYbY0zufdVVBje99J4=',
	'VrOrkjT8AJ7WgJxnK8xAi6bWEGUsny_1r-bgRJ5LIDA=',
	'z4TnF01gJ-KcKo1VBAn4xr5vrrHHX0Mr_eMLAaSYbgM=',
	'UF36qYsUzfwX6GDNuWgpDXrqsmrLcK4Rw5D4hZY5Pxc=',
	'tCWfRynYpmr1pMuaVTk9I2Uhz1RXZg05buXdRVDhTgw=',
	'Q8XI5uvgwOT41A1eWKKVRoQdzjDvYXRtVLpT6n7KVrg=',
	'7BgG9kGGcmyzlhuIDM9OgK5RUQfRWSmhhLhx94zeacg=',
	'sbnlvN2OV8y140ijKiAr12nnhEkcKAYZyaxtOZOteqs=',
	'7gqfws0MWRPiMksDMMfnZZFhU66gzItyl2x5wJa6mEE=',
	'tcJvWiZJInhq79YFWAhvTjB-bNjhTM4evTflhFk1tNc=',
	'2NZjXsMnsZoT5N4kz3DczXmFPvrLi_j33Cm-GcLR1TM=',
	'aVyyHCAyvC17oFRmyiZz_fgZ1yWnZPrBwhmF3oRqT1w=',
	'L0t4mfByXjqq-D2chMAXxTszaL3NYeO4bFskYLggAgw=',
	'e1f99wHPWlA4tbG2BGGqacK7zZJhL2sdpBTB_85GJpY=',
	'uYLjQ55HRs_nAw4G3VwtNhdWBf5QfNb28fpeL7Dtlfs=',
	'gYPWrgRG5OLSJggPaUEZnsBzGFeO760OKtzGP6QOaPY=',
	'ivpgC5yom94eofeYj4k22SwDAVPdLP2Wt19FDINLPLo=',
	'Mjx12gwAspKWigyP6Dg3FVwrRgxwxvXyvcfwrR7T-HY=',
	'bEZxDyg6q6E1iYE3bJp8CyagoUShG0lUxmvF_eeLyyo=',
	'w3cYd84PoRdRJ0aJSg_A5Fn_WPpCROPaeq403DjEOAg=',
	'QltZuORSeUv2rFJ2ue2dvqFPlQ6hjG5OKG35dgDq0aM=',
	'xzWBwbu5eZ6QN5D04BxHfZcNq4-9_khDdWiMLYZKhXk=',
	'jUda1pi-FdNlaUmgKq51B4h8x4wX3QTN2fZkKq6N0vw=',
	'UvSAZLlu9KW-oJ2x4UXpVMlNKng07ORDuT8a9fN10g0=',
	'ydlWhmBPCDOAvTistbM_sxpgOCItnmgrzgGWXwCmICw=',
	'EzfIm6HTJ8t1dZCJ0WukRqqZgEyX_6Hd64B4SK0ciqw=',
	'EhPGap_lKavTMqT2DUdCSDKsQaAiG99v0Rq__pINhMM=',
	'UQrhi8C2lSXtgkojDyC0Vqo4NvwHsYkOFRDUhlVkv80=',
	'kVeul81pcomlG3BHGnuKWAECfpCk_XLxN_AUgTWbkWo=',
	'xXMriwXHhCcyhqDEKlRr2FeNRm4jLHnRbZiN-8UaMF4=',
	'LOZXloZfVxGx7h5Na3R-5RcR86-mMDDJuKiE4q_hJOY=',
	'LHZrg3Wy1VbccX9lkavXmUGYz2X0nyfmNssBNDI_JqQ=',
	'IBSH7dQG0hSQE6oJo9G_xrHxhW4wUt8iiYGn2Ob65c8=',
	'H1DdvseIeFYJUwYwfSNvsXvbgxfwasspZw2MT3Apkfg=',
	'4ARwDn4G8TDYaA-IADNZk2u0EcprJ7MxGKYge7spfaM=',
	'Y6BohTU6jJvc4HcCFaKcphCrPy6uYyWTYo00gCatUrE=',
	'2zEzY32slzJJWUyPMElMOWuczCBWRl7EZdeR8Kz8i-Q=',
	'XSDgPwFuQVcj57ARcKTGrm2w80KKlqJxaBWF6jZqe7w=',
	'cUYiKW4fvU0EitC8ndH9amB3y3wlwxp8Fgp4fIzJXyI=',
	'z8tthwrZkWh__i4RMQgeCDItQczDDToA956uivAsPBE=',
	'K3XwWcHnGuoik2XEbnqgku5jl6s-agyNWXVPnc9qbt4=',
	'FdCd2urr-h9ej31OQ7lEzyjwrqvNiKkzbbGbfV8snfo=',
	'lq6YieTSPvSZ30Ko754V8VQMqVYbi5GAR928Y8Jok88=',
	'jEwXVxDdBJ7TGKYlbAWvoLKqCjFY_iuzY7PabwtIoF8=',
	'6lg5zQJ4GYDjvO5NvVAfPBWuxNgOeEcLAfcL01ws5Us=',
	'EBGuilPthpdMOlNWYPk9oqVOOlRLkK_goRnRRDjMRMg=',
	'LNQR7by2d4x_GcRrl47_US9ZJ1j12JkObQoxSG6oUlM=',
	'xGlgorYroSBvnL8aSeh_jNsdOZD7vyPX6kJRv5tIQPk=',
	'11awWpg5oXXnNqdmx79GbUOXhE5puhu9dQYnKb_4aoA=',
	'oj9ThrFF3vIYbKto6vxshHVZ5l5FDoKvZ5lxZOrQtOg=',
	'm3u9RgYlYchemnTKZDZSZV9xLGReVz_KGG5sV0tIrUE=',
	'R557uIAkqgPzgzpItTOy1G3hq6JGvQEpWqXxib2qqPU=',
	'AMs11l6c3oONHu7hA9AeXzEamcuHp7cIEfUt0mRN8g8=',
	'SV5kdZqv7HuVnB0A9hgFHPi3lubBZ0Tiu0zZS-XMZ-A=',
	'CHy1KZOLAqhXO99_db3D9MHcmvVfzROzLn_3Oar-A_M=',
	'XyKL4912vsx41aNjTJDLDexSgi4_BcPkilZ8twJlqxI=',
	'1mBkagpZ6JI5aGrhKsfnb7_M1rtz8N6nraFghzTJs-w=',
	'6fLsB5BZHfI1tPdWILgHSAWF6hcYpycAlU9B8PQxziU=',
	'G9PrA-VHfqLNLSKcm8jZ_FF4Ezts2WbqyXZofndRGIM=',
	'9uUkCzYhzkjCVhwMmQzAGZKSCoGDY0fHo8mksrypvZk=',
	'HW-DsDcsApBwqtMlSu8S7BpNvtLdq5jvBrJD7kxz7pM=',
	'Tli7Vb3hGsndPD3Kju2N-xrhi8VSTbV-h87_GNZPAY0=',
	'2RLtAczfQSjDKdV6oH7AQPeq6lA7MARoqnCIi0aDQGA=',
	'UsLiYpuh5exI0XENoG3FGM-UhRSf6Xbis8NvjvwMh5w=',
	'yMULOeiMRNMKdE8bNom7IBJ8-QBLPSfNbPlva9xRQnM=',
	'ilCVJncB9VSleHEsrO8AfR-Wp5AzVILt14KaSjKt5vg=',
	'viUcpRzCFYZUuCyABVcLzx6QMpmB07MqM0WzOi63irc=',
	'57ErQ5loSD9BlgJCB1nUOKthiQC6uxZ6ZESdKngaphM=',
	'iCKGtNOhEODQBvv6hcfWklD3P_3tOipTR10x1Yx-qkg=',
	'EpyFRGSu1FdYCAqyEwPN75u6OvLagSubepe_9JlZpS8=',
	'N9ZJMr7cubfbHQkJNvmu09gV8IqsWdjgecVckxE0oQg=',
	'tB-dgPdkZ4WHHVl_DQHupA0FQvK9HnjZYKk03SX9eow=',
	'c0vlYkUjRRUSR6rViR2oroji-OWVkNcDTP4xB3VzHz0=',
	'Pd1nJQpl0CJtT2ZEshvdSWhte-VGn_Vpg6z1m_t1YLA=',
	'sWvuYt3_OdvFB3_iAAvn9xIwB1HnbxCT1C0gdqY5Q0E=',
	'GVboljZKY6m9JBjDCnrT0lUfAe28t1W5UFNJRIH-xfY=',
	'C7BwxmGX6YkIhp8TXYzUTE7qrXGoKjuP8qpRa3uVhUQ=',
	'bWDt_ZpCEksmGSMxE9w09b16jmMYKVSdkbvHTRQR6Jo=',
	'RqVUBinw3duaIfMSf1k8NTF64DNV5Ic9todEMGTRHR8=',
	'xrVlmpUDMCyt505oOZXdr-iJPP6PhfL7O0CbIkikFxk=',
	'SNdMHnnes04aSQQwpNdWT0uBt6VdKyT3Zog7miIsaK0=',
	'lTrJShA8bLeyWUn-DHIuT_7591FZ7PXqXscO6gVX4N0=',
	'gHO2CKahfi2EMVYX6Q5B6ZvLcbnTaNrCwk1lniDsEDM=',
	'FauI5kYd6htIGa3oGEMrtDDHwGaNuhz8GtWWcNtTJjU=',
	'Cgc62fJkvkTHjwGZ0zupDxDV6wQme_4X8K5TTMCx-_Y=',
	'PZA75rAKiN4P9poFNpkZYK-yrF1r3WgpEHmbvwPjbXk=',
	'pKrsAdCqXLx_igOIoEF994iMr63rG_l4_hKjYGAVXGs=',
	'ro3oEPTVu7T0ZmqejM9JEv3jHLqfLHZTDqJVagZm6HE=',
	'ECkZFb80o2ayE-_kp7gbOrOVY1hzQKOzp1edGfPLZHc=',
	'0vxdfbwEGwn4il9c4oGyjno56OLaf-q61GARCJvMK0U=',
];

function hashCode(str: string) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

export const getRandomProjectId = (name: string) => ids[Math.floor(hashCode(name) % ids.length)]