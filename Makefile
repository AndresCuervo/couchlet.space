make:
	parcel build index.html --out-dir docs --public-url "." && echo "couchlet.space" > docs/CNAME
