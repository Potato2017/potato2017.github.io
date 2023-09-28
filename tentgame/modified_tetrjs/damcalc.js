// stolen from swng: https://github.com/swng/tetriodamcalc/blob/main/tetriodamcalc.js
yo = {
	scoring: {
		SINGLE: 100,
		DOUBLE: 300,
		TRIPLE: 500,
		QUAD: 800,
		TSPIN_MINI: 100,
		TSPIN: 400,
		TSPIN_MINI_SINGLE: 200,
		TSPIN_SINGLE: 800,
		TSPIN_MINI_DOUBLE: 400,
		TSPIN_DOUBLE: 1200,
		TSPIN_TRIPLE: 1600,
		TSPIN_QUAD: 2600,
		BACKTOBACK_MULTIPLIER: 1.5,
		COMBO: 50,
		ALL_CLEAR: 3500,
		SOFTDROP: 1,
		HARDDROP: 2,
	},
	garbage: {
		SINGLE: 0,
		DOUBLE: 1,
		TRIPLE: 2,
		QUAD: 4,
		TSPIN_MINI: 0,
		TSPIN: 0,
		TSPIN_MINI_SINGLE: 0,
		TSPIN_SINGLE: 2,
		TSPIN_MINI_DOUBLE: 1,
		TSPIN_DOUBLE: 4,
		TSPIN_TRIPLE: 6,
		TSPIN_QUAD: 10,
		BACKTOBACK_BONUS: 1,
		BACKTOBACK_BONUS_LOG: 0.8,
		COMBO_MINIFIER: 1,
		COMBO_MINIFIER_LOG: 1.25,
		COMBO_BONUS: 0.25,
		ALL_CLEAR: 10,
	},
};

t = {
	setoptions: {
		garbagemultiplier: 1,
		b2bchaining: !0,
	},
	stats: {
		seed: 0,
		lines: 0,
		level_lines: 0,
		level_lines_needed: 1,
		inputs: 0,
		time: { start: 0, zero: !0, locked: !1, prev: 0, frameoffset: 0 },
		score: 0,
		zenlevel: 1,
		zenprogress: 0,
		level: 0,
		combo: 0,
		currentcombopower: 0,
		topcombo: 0,
		btb: 0,
		topbtb: 0,
		tspins: 0,
		piecesplaced: 0,
		clears: {
			singles: 0,
			doubles: 0,
			triples: 0,
			quads: 0,
			realtspins: 0,
			minitspins: 0,
			minitspinsingles: 0,
			tspinsingles: 0,
			minitspindoubles: 0,
			tspindoubles: 0,
			tspintriples: 0,
			tspinquads: 0,
			allclear: 0,
		},
		garbage: { sent: 0, received: 0, attack: 0, cleared: 0 },
		kills: 0,
		finesse: { combo: 0, faults: 0, perfectpieces: 0 },
	},
	currentbtbchainpower: 0,
};
function damcalc(s, n) {
	let i = 0,
		r = 0;
	switch (s) {
		case 0:
			'mini' === n
				? ((i = yo.scoring.TSPIN_MINI), (r = yo.garbage.TSPIN_MINI), t.stats.clears.minitspins++)
				: 'normal' === n && ((i = yo.scoring.TSPIN), (r = yo.garbage.TSPIN), t.stats.clears.realtspins++);
			break;
		case 1:
			'mini' === n
				? ((i = yo.scoring.TSPIN_MINI_SINGLE),
				  (r = yo.garbage.TSPIN_MINI_SINGLE),
				  t.stats.clears.minitspinsingles++)
				: 'normal' === n
				? ((i = yo.scoring.TSPIN_SINGLE), (r = yo.garbage.TSPIN_SINGLE), t.stats.clears.tspinsingles++)
				: ((i = yo.scoring.SINGLE), (r = yo.garbage.SINGLE), t.stats.clears.singles++);
			break;
		case 2:
			'mini' === n
				? ((i = yo.scoring.TSPIN_MINI_DOUBLE),
				  (r = yo.garbage.TSPIN_MINI_DOUBLE),
				  t.stats.clears.minitspindoubles++)
				: 'normal' === n
				? ((i = yo.scoring.TSPIN_DOUBLE), (r = yo.garbage.TSPIN_DOUBLE), t.stats.clears.tspindoubles++)
				: ((i = yo.scoring.DOUBLE), (r = yo.garbage.DOUBLE), t.stats.clears.doubles++);
			break;
		case 3:
			n
				? ((i = yo.scoring.TSPIN_TRIPLE), (r = yo.garbage.TSPIN_TRIPLE), t.stats.clears.tspintriples++)
				: ((i = yo.scoring.TRIPLE), (r = yo.garbage.TRIPLE), t.stats.clears.triples++);
			break;
		case 4:
			n
				? ((i = yo.scoring.TSPIN_QUAD), (r = yo.garbage.TSPIN_QUAD), t.stats.clears.tspinquads++)
				: ((i = yo.scoring.QUAD), (r = yo.garbage.QUAD), t.stats.clears.quads++);
	}
	if (s && t.stats.btb > 1)
		if (((i *= yo.scoring.BACKTOBACK_MULTIPLIER), t.setoptions.b2bchaining)) {
			const a =
				yo.garbage.BACKTOBACK_BONUS *
				(Math.floor(1 + Math.log1p((t.stats.btb - 1) * yo.garbage.BACKTOBACK_BONUS_LOG)) +
					(t.stats.btb - 1 == 1
						? 0
						: (1 + (Math.log1p((t.stats.btb - 1) * yo.garbage.BACKTOBACK_BONUS_LOG) % 1)) / 3));
			if (
				((r += a),
				Math.floor(a) >= 2,
				Math.floor(a) > t.currentbtbchainpower && (t.currentbtbchainpower = Math.floor(a)))
			) {
				// a
			}
		} else r += yo.garbage.BACKTOBACK_BONUS;
	else s && t.stats.btb <= 1 && (t.currentbtbchainpower = 0);

	t.stats.combo > 1 &&
		((i += yo.scoring.COMBO * (t.stats.combo - 1)), (r *= 1 + yo.garbage.COMBO_BONUS * (t.stats.combo - 1))),
		t.stats.combo > 2 &&
			(r = Math.max(
				Math.log1p(yo.garbage.COMBO_MINIFIER * (t.stats.combo - 1) * yo.garbage.COMBO_MINIFIER_LOG),
				r
			)),
		(i *= t.stats.level),
		(t.stats.score += i);
	const l = Math.floor(r * t.setoptions.garbagemultiplier);
	t.stats.combo > 2 && (t.stats.currentcombopower = Math.max(t.stats.currentcombopower, l)),
		s && t.stats.combo > 1,
		s && t.stats.combo > 1 && t.stats.currentcombopower >= 7;

	return l;
}
function B2B_level(B2B) {
	// source: osk: https://discord.com/channels/673303546107658242/674421736162197515/713419086486437960
	if (B2B < 1) return 0;
	if (B2B < 3) return 1;
	if (B2B < 8) return 2;
	if (B2B < 24) return 3;
	if (B2B < 67) return 4;
	if (B2B < 185) return 5;
	if (B2B < 504) return 6;
	if (B2B < 1370) return 7;
	return 8; // next "level" starts at ~3725 but we're keeping it oskreveal
}
function attackTable(type, combo, B2B) {
	if (type == -1) return 0;
	if (type < 3) B2B = 0; // these two sanity checks shouldn't be necessary and are handled at the upper level but... redundancy?
	
	t.stats.combo = combo + 1;
	t.stats.btb = B2B + 1;

	if (type == 0 || type == 4 || type == 5) s = 1;
	if (type == 1 || type == 6 || type == 7) s = 2;
	if (type == 2 || type == 8) s = 3;
	if (type == 3) s = 4;

	if (type <= 3) n = '';
	if (type == 4 || type == 6) n = 'mini';
	if (type == 5 || type == 7 || type == 8) n = 'normal';
	console.log(type, combo, B2B)
	return damcalc(s, n);
}

function attack(damage) {
	totalDmg += damage;
}	