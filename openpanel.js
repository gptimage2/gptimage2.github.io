(function () {
  const productionHost = "gptimage2.github.io";

  if (window.location.hostname !== productionHost) {
    return;
  }

  window.op =
    window.op ||
    (function () {
      const queue = [];

      return new Proxy(
        function () {
          if (arguments.length) {
            queue.push([].slice.call(arguments));
          }
        },
        {
          get: function (_target, property) {
            if (property === "q") {
              return queue;
            }

            return function () {
              queue.push([property].concat([].slice.call(arguments)));
            };
          },
          has: function (_target, property) {
            return property === "q";
          },
        },
      );
    })();

  window.op("init", {
    clientId: "c7ef6b50-484d-42eb-811d-5f3aa43674be",
    trackScreenViews: false,
    trackOutgoingLinks: false,
    trackAttributes: false,
  });
  window.op("screenView");

  const script = document.createElement("script");
  script.src = "https://openpanel.dev/op1.js";
  script.defer = true;
  script.async = true;
  document.head.appendChild(script);
})();
