
<script>

const ndef = new NDEFReader();
try {
  await ndef.write({
    records: [{ recordType: "url", data: "https://w3c.github.io/web-nfc/" }]
  });
} catch {
  console.log("Write failed :-( try again.");
};

</script>