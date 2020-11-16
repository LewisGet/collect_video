from werkzeug.wrappers import Request, Response
import numpy as np
import json
import os

urls_npy_file_name = "urls.npy"
api_path = "add"

@Request.application
def application(request):
    data = []

    if os.path.exists(urls_npy_file_name):
        data = np.load(urls_npy_file_name)
        data = data.tolist()

    if None is not request.args.get(api_path):
        url = request.args.get(api_path)

        data.append(url)
        data = list(dict.fromkeys(data))

    np.save(urls_npy_file_name, data)

    return Response(json.dumps(data), mimetype='text/json')

if __name__ == "__main__":
    from werkzeug.serving import run_simple
    run_simple("127.0.0.1", 8000, application)
