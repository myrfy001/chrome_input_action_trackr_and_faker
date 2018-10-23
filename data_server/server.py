#coding:utf-8

from sanic import Sanic
from sanic.response import json

app = Sanic()

fo = open('/data/browser_input.json', 'ab')
@app.route("/", methods=['POST'])
async def test(request):
    fo.write(request.body)
    fo.write(b'\n')
    return json({})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9988)