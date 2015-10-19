import test from 'tape';
import NodeGitVersioning from './index';

test('Throw an exception when called without a tag', (t) => {
  let nodeGitVersion = new NodeGitVersioning();

  t.throws(function() {
    nodeGitVersion.version();
  });

  t.end();
});

test('Throw an exception when called with abcd123-dirty (an improperly formatted tag)', (t) => {
  let nodeGitVersion = new NodeGitVersioning();

  t.throws(function() {
    nodeGitVersion.version('abcd123');
  });

  t.end();
});

test('Return v1.0.0-0-g0000000 given v1.0.0-0-gabcd123 (same commit as the last tag)', (t) => {
  let nodeGitVersion = new NodeGitVersioning();

  var correctSha = nodeGitVersion.correctSha('v1.0.0-0-gabcd123');

  t.equal(correctSha, 'v1.0.0-0-g0000000');

  t.end();
});

test('Return 1.0.0-1-gabcd123 given v1.0.0-1-gabcd123 (strip the \'v\')', (t) => {
  let nodeGitVersion = new NodeGitVersioning();

  var version = nodeGitVersion.version('v1.0.0-1-gabcd123');

  t.equal(version, '1.0.0-1-gabcd123');

  t.end();
});
